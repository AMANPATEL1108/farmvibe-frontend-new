import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Category {
  id: number;
  name: string;
  description: string;
  category_image_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl =
    'http://localhost:8080/public/api/categories/get-all-categories';

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }
}
