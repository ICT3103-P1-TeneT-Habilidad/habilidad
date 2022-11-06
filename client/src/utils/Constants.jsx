export const copyrighted_msg = 'Copyrighted © TeneT'

export const website_name = 'Habilidad'

export const year = new Date().getFullYear()

export const filterOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'highest', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest' },
]

export const languageOptions = [
    { value: 'CHINESE', label: 'Chinese' },
    { value: 'ENGLISH', label: 'English' },
    { value: 'FRENCH', label: 'French' },
    { value: 'INDIAN', label: 'Indian' },
    { value: 'JAPANESE', label: 'Japanese' },
    { value: 'KOREAN', label: 'Korean' },
    { value: 'MALAY', label: 'Malay' },
]

export const allowAllRoles = {
    STUDENT: 'student',
    INSTRUCTOR: 'instructor',
    MODERATOR: 'moderator',
}

export const allowInstructorOnly = {
    INSTRUCTOR: 'instructor',
}

export const allowStudentOnly = {
    STUDENT: 'student',
}

export const allowInstructorModeratorOnly = {
    INSTRUCTOR: 'instructor',
    MODERATOR: 'moderator',
}

export const allowModeratorOnly = {
    MODERATOR: 'moderator',
}
