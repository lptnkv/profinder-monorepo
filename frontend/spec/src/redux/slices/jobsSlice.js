let initialState = [
    {
        "id": 1,
        "name": "Чистка компьютера",
        "descr": "Очищу компьютер от пыли",
        "price": 1000,
        "creator_id": 2,
        "phone_number": 12312412,
        "address": "Москва, метро Юго-западная"
    },
    {
        "id": 2,
        "name": "подкачка шин",
        "descr": "накачаю шины",
        "price": 500,
        "creator_id": 2,
        "phone_number": 12312412,
        "address": "Москва, метро Юго-западная"
    },
    {
        "id": 3,
        "name": "репетитор",
        "descr": "по английскому",
        "price": 500,
        "creator_id": 2,
        "phone_number": 12312412,
        "address": "Москва, метро Юго-западная"
    },
]

export default function jobsReducer(state = initialState, action) {
    switch (action.type) {
        case 'jobs/addJob': {
            const existingJob = state.find(job => job.id == action.payload.id)
            if (!existingJob) {
                return [...state, action.payload]
            }
            return state
        }
        case 'jobs/removeJob': {
            return state.filter((item, index) => index !== action.payload)
        }
        case 'jobs/setJobs': {
            return action.payload
        }
        default:
            return state
    }
}