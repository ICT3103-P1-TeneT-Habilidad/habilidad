import { PrismaClient } from '@prisma/client'
let prisma

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient()
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient()
    }

    prisma = global.prisma
}

export const prismaTransactions = async (transactions) => {
    return await prisma.$transaction(transactions)
}

const topics = [
    {
        "Health and Wellness": "Everyone wants to be happy, and taking care of your mind and body"
    },
    {
        "Language Learning": "Languages have always been a popular extra-curricular topic. "
    },
    {
        "Personal Development": "Personal development improves people’s quality of life by evolving"
    },
    {
        "Personal Finance": "Personal finance is someone’s budgeting, saving, and spending of savings "
    },
    {
        "Business and Entrepreneurship": "Statistics show that the number of people starting businesse"
    },
    {
        "Sales and Marketing": "Sales and marketing pertain to every industry."
    },
    {
        "IT and Software": " As technology is changing, this industry is growing fast."
    },
    {
        "Design and Development": "Design and development is an umbrella term that describes creating and developing websites, software, games, etc."
    },
    {
        "Academic Topics": "They are the foundation of traditional learning topics, and they’ve become very popular for online learning as well."
    },
    {
        "Art and Creativity": "Not every online course needs to be about serious subjects like Math and programming. "
    },
    {
        "Photography and Video": "Photography and video are a hot niche since they are creative, allow you to experience and work your own hours, and pay pretty well."
    },
    {
        "Home D.I.Y. and Gardening": "People love home improvement and gardening content."
    },
    {
        "Pet Care and Training": "Pet care and training are an ever-growing hot niche."
    },
    {
        "Sports and Outdoor": "Traditionally, people take sports classes in sports centers and with in-life teachers. "
    }
]

const url = [
    "https://res.cloudinary.com/drznyznmo/image/upload/v1667755614/photo-logo_jmxz0f.png",

    "https://res.cloudinary.com/drznyznmo/image/upload/v1667755613/pet-logo_um14xl.png",

    "https://res.cloudinary.com/drznyznmo/image/upload/v1667755612/personal-dev-logo_jiaqwg.png",

    "https://res.cloudinary.com/drznyznmo/image/upload/v1667755612/language-logo_lxy1rs.png",

    "https://res.cloudinary.com/drznyznmo/image/upload/v1667755612/finance-logo_ntnwsm.png",

    "https://res.cloudinary.com/drznyznmo/image/upload/v1667755612/health-wellness-logo_fvgmpj.png",

    "https://res.cloudinary.com/drznyznmo/image/upload/v1667755612/it-logo_iiyctu.png",

    "https://res.cloudinary.com/drznyznmo/image/upload/v1667755612/home-logo_phupfx.png",

    "https://res.cloudinary.com/drznyznmo/image/upload/v1667755612/business-logo_a2fu7m.png",

    "https://res.cloudinary.com/drznyznmo/image/upload/v1667755611/art-logo_are7ir.png",

    "https://res.cloudinary.com/drznyznmo/image/upload/v1667755611/academic-logo_lbis6l.png",

    "https://res.cloudinary.com/drznyznmo/image/upload/v1667755611/sports-logo_o3ppct.png",

    "https://res.cloudinary.com/drznyznmo/image/upload/v1667755611/sales-logo_z09j4j.png",
    "https://res.cloudinary.com/drznyznmo/image/upload/v1667756142/design_oe3qjv.png"
]

const filtered = []

for (const topic in topics) {
    const key = Object.keys(topics[topic])[0]
    const temp = {
        "topicName": key,
        "description": topics[topic][key],
        "url": url[topic]
    }
    filtered.push(temp)
}
console.log(url)

await prisma.topics.createMany({
    data: filtered
})

export default prisma