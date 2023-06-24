import { axiosMethod } from "../api/rootApiHaveToken";
import rootApiNoToken from "../api/rootApiNoToken";

class AuthenApi {
    // apiEndPoint: string;
    // constructor() {
    //   this.apiEndPoint = HOST_SERVER;
    // }

    // async login({
    //   userNameOrEmailAddress,
    //   password,
    // }: ILoginPayload): Promise<IToken> {
    //   const url = `${this.apiEndPoint}/api/TokenAuth/Authenticate`;
    //   const data = {
    //     userNameOrEmailAddress,
    //     password,
    //     rememberClient: true,
    //   };

    //   const response = await axiosRequest({
    //     url,
    //     method: axiosMethod.POST,
    //     data,
    //   });

    //   return {
    //     accessToken: response.result.accessToken,
    //     encryptedAccessToken: response.result.encryptedAccessToken,
    //   };
    // }

    // async getUserInfo(): Promise<IUser> {
    //   const accessToken = await AsyncStorage.getItem('accessToken');
    //   const url = `${this.apiEndPoint}/api/services/app/User/GetDetail`;
    //   const response = await axiosRequest({
    //     token: accessToken,
    //     url,
    //     method: axiosMethod.GET,
    //   });

    //   return response.result;
    // }

    async register({
        email,
        user_name,
        password,
        first_name,
        last_name,
        phone,
    }) {
        const url = `/authenticate/register`;
        const data = {
            email,
            user_name,
            password,
            first_name,
            last_name,
            phone,
        };

        const response = await rootApiNoToken.request({
            url,
            method: axiosMethod.POST,
            data,
            timeout: 30000,
        });

        return response.data;
    }
}

export default new AuthenApi();
