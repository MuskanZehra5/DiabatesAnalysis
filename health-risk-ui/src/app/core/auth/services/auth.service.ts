// core/auth/auth.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { Auth, User, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  
  currentUser = signal<User | null>(null);
  user$ = user(this.auth);
  
  constructor() {
    this.user$.subscribe(user => this.currentUser.set(user));
  }

  async googleSignIn() {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(this.auth, provider);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      this.toastr.error('Authentication failed');
      throw error;
    }
  }

  async signOut() {
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): Observable<boolean> {
    return this.user$.pipe(map(user => !!user));
  }
}