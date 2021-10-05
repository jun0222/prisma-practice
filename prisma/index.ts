import { PrismaClient } from '@prisma/client'
import { User } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
// TODO ここに処理を記載する
    const alice = await prisma.user.findUnique({
        where: { email: 'alice@example.com' }
    })
    console.log(alice)

    const users = await prisma.user.findMany()
    console.log(users)

    const bob = await prisma.user.findUnique({
        where: {email: 'bob@example.com'},
        include: { posts: true }
    })
    console.log(bob)

    const posts = await prisma.post.findMany({
        where: {
            title: {
                startsWith: 'title'
            }
        },
        take: 5,
        orderBy: {
            id: 'asc'
        },
        include: { author : true }
    })
    console.log(posts)


    console.log("========SQL直書き========")

    const allUser = await prisma.$queryRaw`SELECT * FROM User`
    console.log(allUser)

    // const email2 = 'alice@example.com'
    // const alice2 = await prisma.$queryRaw<User>(`SELECT * FROM "postgres"."User" WHERE "postgres"."User"."email" = '${email2}';`)
    // console.log(alice2)

    // const email3 = "'' OR 1=1 ORDER BY 1 DESC"
    // const alice3 = await prisma.$queryRaw(`SELECT * FROM "postgres"."User" WHERE "postgres"."User"."email" = ${email3};`)
    // console.log(alice3)

    // const alice4 = await prisma.user.findUnique({
    //     where: { email: 'alice@example.com' }
    // })

}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })