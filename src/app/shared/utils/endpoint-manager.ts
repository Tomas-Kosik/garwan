import { Endpoint } from '../enums/endpoint.enum';
import { AppConstants } from '../constants/app-constants';


export class EndpointManager {

  public static getEndpointPrefix(endpoint: Endpoint): string {
    return `${AppConstants.URL_API}/search/${endpoint}`;
  }

}
