import { Injectable } from '@angular/core';
import { MockResponsaveisService } from '../../../assets/mockResponsaveis.service';
import { Responsavel } from '../../pages/todo/models/responsavel.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsaveisService {
  url = 'http://http://localhost:4200/';

  constructor() { }

  get(): Observable<ApiResponse<Responsavel[]>> {
    return of(ApiResponse.ok(MockResponsaveisService.Responsaveis));
  }

  getById(id: number): Observable<ApiResponse<Responsavel | null>> {
    const responsavel = MockResponsaveisService.Responsaveis.find(x => x.responsaveisId === id);

    // return responsavel ? of(ApiResponse.fail<Responsavel>('Responsável não encontrado')) : of(ApiResponse.ok(responsavel));

    if (!responsavel) {
      return of(ApiResponse.fail<Responsavel>('Responsável não encontrado'));
    }

    return of(ApiResponse.ok(responsavel));
  }
}

// export interface ApiResponse<T = any> {
//   data: T;
//   message: string;
//   success: boolean;
// }

export class ApiResponse<T = any> {
  constructor(
    public success: boolean,
    public data: T,
    public message = '',
  ) { }

  public static ok<T>(data: T): ApiResponse<T> {
    return new ApiResponse(true, data);
  }

  public static fail<T>(message: string): ApiResponse<T | null> {
    return new ApiResponse(false, null, message);
  }
}
