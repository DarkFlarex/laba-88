import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Post from "./models/Post";
import Comment from "./models/Comment";

const run = async () => {
    await mongoose.connect(config.database);
    const db = mongoose.connection;

    try {
        await db.dropCollection('comments');
        await db.dropCollection('posts');
        await db.dropCollection('users');
    } catch (e) {
        console.log('Skipping drop...');
    }

    const user1 = new User({
        username: 'userMusic',
        password: '123',
    });

    user1.generateToken();

    const user2 = new User({
        username: 'amantai',
        password: '123',
    });
    user2.generateToken();

    await user1.save();
    await user2.save();

    const [
        kurtCobain,
        ladyGaga
    ] = await Post.create({
        userPosted: user1,
        title: 'Курт Кобейн',
        description: 'Курт До́нальд Кобе́йн — американский рок-музыкант, вокалист, гитарист и автор песен. Наиболее известен как основатель и лидер рок-группы «Нирвана». В середине 1980-х годов Кобейн начал увлекаться панк-роком, а в 1987 году вместе с Кристом Новоселичем образовал группу «Нирвана».',
        image: 'fixtures/kurt.jpg',
    }, {
        userPosted: user1,
        title: 'Леди Гага',
        description: 'Ле́ди Га́га — американская певица, автор песен, продюсер, филантроп и актриса. Имеет множество наград, среди которых шесть премий «Грэмми», 13 MTV Video Music Awards и 8 MTV Europe Music Awards, а также занимает четвёртое место в списке 100 величайших женщин в музыке по версии VH1.',
        image: 'fixtures/gaga.jpg',
    });

    const [
        thrall,
        arthas
    ] = await Post.create({
        userPosted: user2,
        title: 'Тралл',
        description: 'Тралл, сын Дуротана (англ. Thrall, son of Durotan), так же известен, как Го\'эл (англ. Go\'el) — орк, третий лидер Орды',
        image: 'fixtures/thrall.jpg',
    }, {
        userPosted: user2,
        title: 'Артас Менетил',
        description: 'принц Лордерона и рыцарь Cеребряной Длани',
        image: 'fixtures/arthas.JPG',
    });

    await Comment.create({
        userPosted: user2,
        postId: ladyGaga,
        comment: 'Курт Кобейн хороший певец',
    }, {
        userPosted: user2,
        postId: kurtCobain,
        comment: 'Леди Гага хорошая певица',
    }, {
        userPosted: user1,
        postId: thrall,
        comment: 'Духи повинуются мне',
    },
    {
        userPosted: user1,
        postId: arthas,
        comment: 'За честь и отвагу',
    },
    {
        userPosted: user1,
        postId: arthas,
        comment: 'За моего отца!',
    }
    );

    await db.close();
};

run().catch(console.error);