import axios from "axios";

async function login(email, password) {
    try {
        let { data, status } = await axios.post(
            "https://europe-west3-kickbase-312916.cloudfunctions.net/login",
            {
                email: email,
                password: password,
                ext: false,
            }
        );
        console.log(`status Code: ${status}`);
        let { user, token, leagues } = data;
        return { user, token, leagues };
    } catch (err) {
        console.error(err);
    }
}

async function leagueInfo(leagueId, accessToken) {
    try {
        let { status, data } = await axios.post(
            "https://europe-west3-kickbase-312916.cloudfunctions.net/leagueInfo",
            {
                token: accessToken,
                leagueId: leagueId,
            }
        );
        console.log(`status code: ${status}`);
        return data;
    } catch (err) {
        console.error(err);
    }
}

export { login, leagueInfo };
