import axios from "axios";
import User from "@/lib/models/user.js";
import LeagueData from "@/lib/models/league_data.js";
import MyLeague from "@/lib/models/my_league.js";

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
        return {
            user: new User(user),
            token,
            leagues: leagues.map((league) => new LeagueData(league)),
        };
    } catch (err) {
        console.error(err);
    }
}

async function myLeagueInfo(leagueId, accessToken) {
    try {
        let { status, data } = await axios.post(
            "https://europe-west3-kickbase-312916.cloudfunctions.net/leagueInfo",
            {
                token: accessToken,
                leagueId: leagueId,
            }
        );
        console.log(`status code: ${status}`);
        return new MyLeague(data);
    } catch (err) {
        console.error(err);
    }
}

export { login, myLeagueInfo };
