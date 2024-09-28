// const datas = {
//     settings: {
//         q: [
//             "!순위 <rank>",
//             "!이연우는"
//         ],
//         a: [
//             fetchLevelData,
//             "잘생겼다",
//         ],
//     },
//     rooms: [""],
// };

// async function fetchLevelData(rank) {
//     try {
//         const response = await fetch(`https://gmdkoreaforum.com/api/demonlist/levels?page=${rank}&count=1`);
//         if (!response.ok) throw new Error("Network response was not ok");
        
//         const data = await response.json();
//         if (data.status === "success" && data.data.length > 0) {
//             const level = data.data[0];
//             replier.reply(
//                 `레벨 이름: ${level.level_name}\n
//                 한국포럼 순위: ${level.level_rank}\n
//                 포인터크레이트 순위: ${level.pointercrate_rank}\n
//                 제작자: ${level.creators[0].nickname}\n
//                 베리파이어: ${level.verifier.nickname}\n
//                 비디오 링크: ${level.video_url}`
//             );
//         } else {
//             console.log("순위가 유효하지 않습니다");
//         }
//     } catch (error) {
//         console.error("데이터를 가져오는 중 오류 발생:", error.message);
//     }
// }

// function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
//     if (datas.rooms.includes(room)) {
//         const command = msg.split(" ")[0];
//         const rank = msg.split(" ")[1];

//         if (msg.startsWith("!") && datas.settings.q.includes(command + (rank ? ` ${rank}` : ""))) {
//             const index = datas.settings.q.indexOf(command + (rank ? ` ${rank}` : ""));
//             const action = datas.settings.a[index];

//             if (typeof action === "function") {
//                 action(rank);
//             } else {
//                 replier.reply(room, action);
//             }
//         } else {
//             replier.reply(room, `${msg}는 없는 명령어입니다`);
//         }
//     }
// }

const readline = require("readline");

const datas = {
    settings: {
        q: [
            "!순위 <rank>",
            "!이연우는"
        ],
        a: [
            fetchLevelData,
            "잘생겼다",
        ],
    },
    rooms: [""],
};

async function fetchLevelData(rank) {
    try {
        const response = await fetch(`https://gmdkoreaforum.com/api/demonlist/levels?page=${rank}&count=1`);
        if (!response.ok) throw new Error("Network response was not ok");
        
        const data = await response.json();
        if (data.status === "success" && data.data.length > 0) {
            const level = data.data[0];
            console.log(
                `레벨 이름: ${level.level_name}\n` +
                `한국포럼 순위: ${level.level_rank}\n` +
                `포인터크레이트 순위: ${level.pointercrate_rank}\n` +
                `제작자: ${level.creators[0].nickname}\n` +
                `베리파이어: ${level.verifier.nickname}\n` +
                `비디오 링크: ${level.video_url}`
            );
        } else {
            console.log("순위가 유효하지 않습니다");
        }
    } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error.message);
    }
}

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    if (datas.rooms.includes(room)) {
        const command = msg.split(" ")[0];
        const rank = msg.split(" ")[1];

        if (msg.startsWith("!") && datas.settings.q.includes(command + (rank ? ` ${rank}` : ""))) {
            const index = datas.settings.q.indexOf(command + (rank ? ` ${rank}` : ""));
            const action = datas.settings.a[index];

            if (typeof action === "function") {
                action(rank);
            } else {
                console.log(action);
            }
        } else {
            console.log(`${msg}는 없는 명령어입니다`);
        }
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("순위: ", (inputAnswer) => {
    const rank = inputAnswer.trim();
    if (!isNaN(rank) && rank > 0) {
        fetchLevelData(rank);
    } else {
        console.log("유효한 순위를 입력하세요.");
    }
    rl.close();
});
