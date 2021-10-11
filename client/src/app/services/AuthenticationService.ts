import { BehaviorSubject } from 'rxjs';
import axios, { AxiosResponse } from 'axios';
import config from '../../config.json';
import { ITokens, UserViewModel } from '../models';

class AuthenticationService {
  private readonly CURRENT_USER_KEY = 'current_user';
  private readonly API_BASE_URL = config.API_HOST;

  private currentUser$: BehaviorSubject<{ user: UserViewModel; tokens: ITokens }>;

  get currentUser() {
    return this.currentUser$.asObservable();
  }

  get currentUserValue() {
    return this.currentUser$.value;
  }

  get isLoggedIn() {
    return !!this.currentUser;
  }

  constructor() {
    let initalValue = null;
    const savedUserData = JSON.parse(localStorage.getItem(this.CURRENT_USER_KEY));
    if (savedUserData) {
      const { user, tokens } = savedUserData;
      initalValue = {
        user: new UserViewModel(user),
        tokens,
      };
    }

    this.currentUser$ = new BehaviorSubject(initalValue);
  }

  async login(username: string, password: string) {
    const res: AxiosResponse<{ user: UserViewModel; tokens: ITokens }> = await axios.post(
      `${this.API_BASE_URL}/api/v1/auth/login`,
      { username, password },
    );

    if (res && res.status === 200) {
      const { user, tokens } = res.data;
      const currentUser = {
        user: new UserViewModel(user),
        tokens,
      };

      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(currentUser));
      this.currentUser$.next(currentUser);

      return res.data;
    }

    return null;
  }
}

const authenticationService = new AuthenticationService();

export default authenticationService;
