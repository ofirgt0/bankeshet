import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Class, Coin, Product, User, History } from 'src/entities.model';
import { environment } from 'src/environments/environment';

const USERS = '/Users/';
const CLASSES = '/Classes/';
const PRODUCTS = '/Products/';
const HISTORY = '/History/';
const COINS = '/Coins/';

@Injectable({
  providedIn: 'root',
})
export class FinancialSchoolBackendAccessService implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit() {}

  //classes
  getClassById(classId: string): Observable<Class> {
    return this.http.get<Class>(environment.apiUrl + CLASSES + classId);
  }

  getClasses(): Observable<Class[]> {
    return this.http.get<Class[]>(environment.apiUrl + CLASSES);
  }

  insertNewClass(newClass: Class) {
    return this.http.post(environment.apiUrl + CLASSES, newClass);
  }

  //users
  getUsers(): Observable<any> {
    return this.http.get<User[]>(environment.apiUrl + USERS);
  }

  getUser(userId: string): Observable<any> {
    return this.http.get<User>(environment.apiUrl + USERS + userId);
  }

  insertNewUser(newUser: User): Observable<any> {
    return this.http.post(environment.apiUrl + USERS, newUser);
  }

  //coins
  getCoins(): Observable<any> {
    return this.http.get<Coin[]>(environment.apiUrl + COINS);
  }

  getCoin(coinId: string): Observable<any> {
    return this.http.get(environment.apiUrl + COINS + coinId);
  }

  insertCoin(newCoin: Coin): Observable<any> {
    return this.http.post(environment.apiUrl + COINS, newCoin);
  }

  updateCoin(coinId: string, newWorth: number): Observable<any> {
    return this.http.put(environment.apiUrl + COINS + coinId + '/' + newWorth, null);
  }

  //products
  getProducts(): Observable<any> {
    return this.http.get(environment.apiUrl + PRODUCTS);
  }

  getProduct(productId: number): Observable<any> {
    return this.http.get(environment.apiUrl + PRODUCTS + productId);
  }

  insertProducts(newProduct: Product): Observable<any> {
    return this.http.post(environment.apiUrl + PRODUCTS, newProduct);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(environment.apiUrl + PRODUCTS + productId);
  }

  buyProduct(classId: string, productId: number)
  {
    return this.http.get(environment.apiUrl + CLASSES + classId + '/' + productId);
  }

  updateClassCurrency(classId: string, amount: number, title: string)
  {
    var body ={
      amount: amount,
      title: title,
      classId: classId,
      description: title
    }
    return this.http.post(environment.apiUrl + CLASSES + "Update", body);
  }

  //history
  getHistory(): Observable<any> {
    return this.http.get(environment.apiUrl + HISTORY);
  }

  getHistoryByClassId(classId: string): Observable<History[]> {
    return this.http.get<History[]>(environment.apiUrl + HISTORY + classId);
  }

  insertNewHistoryLine(historyLine: History): Observable<any> {
    return this.http.post(environment.apiUrl + HISTORY, historyLine);
  }

  deleteHistoryLine(historyLineId: number): Observable<any> {
    return this.http.delete(environment.apiUrl + HISTORY + historyLineId);
  }

  getRegistrationValidationValues(): Observable<any> {
    return this.http.get(environment.apiUrl + USERS + 'Validation');
  }
}