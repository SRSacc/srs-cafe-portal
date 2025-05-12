import dayjs from 'dayjs';

// Subscription type definitions
export const SUBSCRIPTION_TYPES = {
    HALF_DAY_MORNING: 'Half-day (morning)',
    HALF_DAY_NIGHT: 'Half-day (night)',
    FULL_DAY: 'Full day',
    WEEKLY_DAY: 'Weekly (day-only)',
    WEEKLY_FULL: 'Weekly (full-access)',
    BIWEEKLY_DAY: 'Bi-weekly (day-only)',
    BIWEEKLY_FULL: 'Bi-weekly (full-access)',
    MONTHLY_DAY: 'Monthly (day-only)',
    MONTHLY_FULL: 'Monthly (full-access)',
};

// Time configurations (24-hour format)
export const TIME_CONFIG = {
    DAY_END: '18:00', // 6:00 PM
    NIGHT_END: '06:30', // 6:30 AM next day
    NOTIFICATION_BEFORE: 60, // minutes before expiry
};

// Calculate end time based on subscription type
export const calculateEndTime = (startTime, subscriptionType) => {
    const start = dayjs(startTime);

    // For day-only access types
    if (subscriptionType.includes('day-only') || subscriptionType === SUBSCRIPTION_TYPES.HALF_DAY_MORNING) {
        return start.format('YYYY-MM-DD') + ' ' + TIME_CONFIG.DAY_END;
    }

    // For full access and night types
    return start.add(1, 'day').format('YYYY-MM-DD') + ' ' + TIME_CONFIG.NIGHT_END;
};

// Calculate expiration date based on subscription type
export const calculateExpirationDate = (startDate, subscriptionType) => {
    const start = dayjs(startDate);

    switch (subscriptionType) {
        case SUBSCRIPTION_TYPES.HALF_DAY_MORNING:
            return start; // Ends same day at 6 PM

        case SUBSCRIPTION_TYPES.HALF_DAY_NIGHT:
        case SUBSCRIPTION_TYPES.FULL_DAY:
            return start.add(1, 'day'); // Ends next day at 6:30 AM

        case SUBSCRIPTION_TYPES.WEEKLY_DAY:
        case SUBSCRIPTION_TYPES.WEEKLY_FULL:
            return start.add(7, 'days');

        case SUBSCRIPTION_TYPES.BIWEEKLY_DAY:
        case SUBSCRIPTION_TYPES.BIWEEKLY_FULL:
            return start.add(14, 'days');

        case SUBSCRIPTION_TYPES.MONTHLY_DAY:
        case SUBSCRIPTION_TYPES.MONTHLY_FULL:
            return start.add(1, 'month').subtract(1, 'day');

        default:
            return start; // For daily subscriptions
    }
};

// Validate subscription timing
export const validateSubscriptionTiming = (subscriptionType, currentTime = dayjs()) => {
    const currentHour = currentTime.hour();

    // Morning shift validation (cannot subscribe after 6 PM for same day)
    if (subscriptionType === SUBSCRIPTION_TYPES.HALF_DAY_MORNING && currentHour >= 18) {
        return {
            isValid: false,
            message: 'Cannot subscribe for morning shift after 6:00 PM. Please subscribe for night plan or come back tomorrow.'
        };
    }

    // Night shift validation (should start after 6 PM)
    if (subscriptionType === SUBSCRIPTION_TYPES.HALF_DAY_NIGHT && currentHour < 18) {
        return {
            isValid: false,
            message: 'Night shift subscription can only start after 6:00 PM'
        };
    }

    return {
        isValid: true,
        message: ''
    };
};

// Calculate subscription status
export const getSubscriptionStatus = (startDateTime, endDateTime, expirationDate) => {
    const now = dayjs();


    try {
        // More lenient date validation
        if (!startDateTime || !endDateTime || !expirationDate) {
            return {
                status: 'invalid',
                message: 'Missing subscription dates'
            };
        }

        const start = dayjs(startDateTime);
        const end = dayjs(endDateTime);
        const expiry = dayjs(expirationDate);

        // Check if dates are valid
        if (!start?.isValid() || !end?.isValid() || !expiry?.isValid()) {
            return {
                status: 'invalid',
                message: 'Invalid subscription dates'
            };
        }

        const minutesBeforeExpiry = TIME_CONFIG.NOTIFICATION_BEFORE;
        const minutesUntilExpiry = expiry.diff(now, 'minute');

        // Not started yet
        if (now.isBefore(start)) {
            return {
                status: 'pending',
                message: `Subscription starts on ${start.format('MMM DD, YYYY [at] hh:mm A')}`
            };
        }

        if (now.isAfter(expiry)) {
            return {
                status: 'expired',
                message: `Subscription expired on ${expiry.format('MMM DD, YYYY [at] hh:mm A')}`
            };
        }

        if (minutesUntilExpiry <= 15) {
            return {
                status: 'expiring',
                message: `Subscription expires in ${minutesUntilExpiry} minutes!`,
                urgent: true
            };
        }

        if (minutesUntilExpiry <= minutesBeforeExpiry) {
            return {
                status: 'expiring',
                message: `Subscription expires in ${Math.floor(minutesUntilExpiry / 60)} hours ${minutesUntilExpiry % 60} minutes`
            };
        }

        return {
            status: 'active',
            message: 'Subscription is active',
            endTime: end.format('MMM DD, YYYY [at] hh:mm A')
        };
    } catch (error) {
        return {
            status: 'invalid',
            message: 'Error processing subscription dates'
        };
    }
};