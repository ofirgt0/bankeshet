import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Class, Coin, Product, User, History } from 'src/entities.model';

const BACKEND_URL = 'https://localhost:44390/api/';
//const BACKEND_URL = 'http://bankeshet.azurewebsites.net/api/';

const USERS = 'Users/';
const CLASSES = 'Classes/';
const PRODUCTS = 'Products/';
const HISTORY = 'History/';
const COINS = 'Coins/';

@Injectable({
  providedIn: 'root',
})
export class FinancialSchoolBackendAccessService implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit() {}

  //classes
  getClassById(classId: string): Observable<Class> {
    return this.http.get<Class>(BACKEND_URL + CLASSES + classId);
  }

  getClasses(): Observable<Class[]> {
    return this.http.get<Class[]>(BACKEND_URL + CLASSES);
  }

  insertNewClass(newClass: Class) {
    return this.http.post(BACKEND_URL + CLASSES, newClass);
  }

  //users
  getUsers(): Observable<any> {
    return this.http.get<User[]>(BACKEND_URL + USERS);
  }

  getUser(userId: string): Observable<any> {
    return this.http.get<User>(BACKEND_URL + USERS + userId);
  }

  insertNewUser(newUser: User): Observable<any> {
    return this.http.post(BACKEND_URL + USERS, newUser);
  }

  //coins
  getCoins(): Observable<any> {
    return this.http.get<Coin[]>(BACKEND_URL + COINS);
  }

  getCoin(coinId: string): Observable<any> {
    return this.http.get(BACKEND_URL + COINS + coinId);
  }

  insertCoin(newCoin: Coin): Observable<any> {
    return this.http.post(BACKEND_URL + COINS, newCoin);
  }

  updateCoin(coinId: string, newWorth: number): Observable<any> {
    return this.http.put(BACKEND_URL + COINS + coinId + '/' + newWorth, null);
  }

  //products
  getProducts(): Observable<any> {
    return this.http.get(BACKEND_URL + PRODUCTS);
  }

  getProduct(productId: number): Observable<any> {
    return this.http.get(BACKEND_URL + PRODUCTS + productId);
  }

  insertProducts(newProduct: Product): Observable<any> {
    return this.http.post(BACKEND_URL + PRODUCTS, newProduct);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(BACKEND_URL + PRODUCTS + productId);
  }

  buyProduct(classId: string, productId: number)
  {
    return this.http.get(BACKEND_URL + CLASSES + classId + '/' + productId);
  }

  updateClassCurrency(classId: string, amount: number, title: string)
  {
    var body ={
      amount: amount,
      title: title,
      classId: classId,
      description: title
    }
    return this.http.post(BACKEND_URL + CLASSES + "Update", body);
  }

  //history
  getHistory(): Observable<any> {
    return this.http.get(BACKEND_URL + HISTORY);
  }

  getHistoryByClassId(classId: string): Observable<History[]> {
    return this.http.get<History[]>(BACKEND_URL + HISTORY + classId);
  }

  insertNewHistoryLine(historyLine: History): Observable<any> {
    return this.http.post(BACKEND_URL + HISTORY, historyLine);
  }

  deleteHistoryLine(historyLineId: number): Observable<any> {
    return this.http.delete(BACKEND_URL + HISTORY + historyLineId);
  }

  getRegistrationValidationValues(): Observable<any> {
    return this.http.get(BACKEND_URL + USERS + 'Validation');
  }
}