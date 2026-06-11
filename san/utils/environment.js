function getEnv() {
    let environment = process.env.ENVIRONMENT || 'QA'; 
    
    if (environment === "QA") {
        return "https://grassroots-qa-v2.orionincsports.com/realms/grassroots/protocol/openid-connect/auth?client_id=grassroots-client&redirect_uri=https%3A%2F%2Fgrassroots-qa-v2.orionincsports.com%2Fgrassroots%2F%23%2F&state=7a4eaaf9-d520-4234-b731-6285bbf4c2b1&response_mode=fragment&response_type=code&scope=openid&nonce=250c9834-52a3-4805-b8fc-7b51ab60b52d&code_challenge=a91CiKzK7VJ_WgM89ydzYrOXeZZX937ZD-Wv-sPW2CM&code_challenge_method=S256";
    } else if (environment === "STAGE") {
        return "https://grassroots-qa-v2.orionincsports.com/grassroots/#/feature/my-portal/dashboard";
    } else if (environment === "DEV") {
        return "https://grassroots-qa-v2.orionincsports.com/realms/grassroots/protocol/openid-connect/auth?client_id=grassroots-client&redirect_uri=https%3A%2F%2Fgrassroots-qa-v2.orionincsports.com%2Fgrassroots%2F&state=d31e232c-f044-4848-b286-729d429c2422&response_mode=fragment&response_type=code&scope=openid&nonce=9b063ba1-4101-4cc7-a1ea-1eb4a7cc9223&code_challenge=nYH7E_onZruVsHJS99FGsBbKTgsriVBrcIngjtd3X24&code_challenge_method=S256";
    } else {   
        return "https://grassroots-qa-v2.orionincsports.com/realms/grassroots/protocol/openid-connect/auth?client_i…";
    }
}

module.exports = {getEnv}