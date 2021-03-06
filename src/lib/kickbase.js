import axios from "axios";
import { User } from "@/lib/models/user.js";
import LeagueData from "@/lib/models/league_data.js";
import MyLeague from "@/lib/models/my_league.js";
import { UserProfile } from "@/lib/models/user_profile.js";

async function login(email, password) {
    try {
        let { data } = await axios.post(
            "https://europe-west3-kickbase-312916.cloudfunctions.net/login",
            {
                email: email,
                password: password,
                ext: false,
            }
        );
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
        let { data } = await axios.post(
            "https://europe-west3-kickbase-312916.cloudfunctions.net/myLeague",
            {
                token: accessToken,
                leagueId: leagueId,
            }
        );
        return new MyLeague(data);
    } catch (err) {
        console.error(err);
    }
}

async function getLeagues(accessToken) {
    try {
        const { data } = await axios.post(
            `https://europe-west3-kickbase-312916.cloudfunctions.net/leagues`,
            {
                token: accessToken,
            }
        );
        const { leagues } = data;
        return leagues.map((league) => new LeagueData(league));
    } catch (err) {
        console.log(err);
    }
}

async function getLeagueUsers(accessToken, leagueId) {
    try {
        const { data } = await axios.post(
            `https://europe-west3-kickbase-312916.cloudfunctions.net/leagueUsers`,
            {
                token: accessToken,
                leagueId: leagueId,
            }
        );
        const { users } = data;
        return users.map((user) => new User(user));
    } catch (err) {
        console.log(err);
    }
}

async function getUserProfile(accessToken, leagueId, userId) {
    try {
        const { data } = await axios.post(
            `https://europe-west3-kickbase-312916.cloudfunctions.net/userProfile`,
            {
                token: accessToken,
                leagueId: leagueId,
                userId: userId,
            }
        );
        return new UserProfile(data);
    } catch (err) {
        console.log(err);
    }
}

export { login, myLeagueInfo, getLeagues, getLeagueUsers, getUserProfile };
