import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import 'rxjs/Rx';

/**
 * SpotifyService works querying the Spotify Web API
 * https://developer.spotify.com/web-api/
 */

@Injectable()
export class SpotifyService implements HttpInterceptor {
  static BASE_URL = 'https://api.spotify.com/v1';
  // https://accounts.spotify.com/authorize?client_id=61c32789840d41a890cd64fb1c3067bc&redirect_uri=http%3A%2F%2Flocalhost%3A8100&scope=user-read-private user-read-email&response_type=token&state=1232
  // gives: access_token=BQDJnIpMj7gP1b3hjJ1lnzxWP68Oefte-2yunwavX-9lNVaGSrYhkhat7O8P_ntX8niO51K6XwrbFq3DWDuf5Hs-xTeFsk3XA8FZ_HBtWHLFhptEUdd_CC6Uy667o-ZLJ1542VJsttbcL38RYcd0wC2RQKJcmEfQOQ

//   http.post(queryURL, body, {
//     headers: new HttpHeaders().set('Authorization', 'access-token-here'),
// })

  constructor(private http: Http) {
  }

  authorize() {
    // https://accounts.spotify.com/authorize?client_id=61c32789840d41a890cd64fb1c3067bc&redirect_uri=http%3A%2F%2Flocalhost%3A8100&scope=user-read-private user-read-email&response_type=token&state=1232
  
    this.http.post("https://accounts.spotify.com/authorize?", "queryURL").map((res: any) => res.json());
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Get the auth token from the service.
        const authToken = this.auth.getAuthorizationToken();
 
        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        const authReq = req.clone({
          headers: req.headers.set('Authorization', authToken)
        });
     
        // send cloned request with header to the next handler.
        return next.handle(authReq);
  }

  query(URL: string, params?: Array<string>): Observable<any[]> {
    let queryURL = `${SpotifyService.BASE_URL}${URL}`;
    if (params) {
      queryURL = `${queryURL}?${params.join('&')}`;
    }

    this.http

    return this.http.request(queryURL).map((res: any) => res.json());
  }

  search(query: string, type: string): Observable<any[]> {
    return this.query(`/search`, [
      `q=${query}`,
      `type=${type}`
    ]);
  }

  searchTrack(query: string): Observable<any[]> {
    return this.search(query, 'track');
  }

  getTrack(id: string): Observable<any[]> {
    return this.query(`/tracks/${id}`);
  }

  getArtist(id: string): Observable<any[]> {
    return this.query(`/artists/${id}`);
  }

  getAlbum(id: string): Observable<any[]> {
    return this.query(`/albums/${id}`);
  }
}

export const SPOTIFY_PROVIDERS: Array<any> = [
  { provide: SpotifyService, useClass: SpotifyService }
];