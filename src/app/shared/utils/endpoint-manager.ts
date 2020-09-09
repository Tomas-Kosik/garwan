import { AppConstants } from '../constants/app-constants';
import { Endpoint } from '../enums/endpoint.enum';

export class EndpointManager {

  public static getBrowseEndpointPrefix(endpoint: Endpoint): string {
    return `${AppConstants.URL_API}/${endpoint}`;
  }

  public static getSearchEndpointPrefix(endpoint: Endpoint): string {
    return `${AppConstants.URL_API}/search/${endpoint}`;
  }

}
