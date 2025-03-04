class User {
    id: number;
    username: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    
    constructor(
      id: number,
      username: string,
      email: string,
      password: string,
      role: string,
      createdAt: Date,
      updatedAt: Date
    ) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.password = password;
      this.role = role;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  
    getId(): number {
      return this.id;
    }
  
    getUsername(): string {
      return this.username;
    }
  
    getEmail(): string {
      return this.email;
    }
  
    getPassword(): string {
      return this.password;
    }
  
    getRole(): string {
      return this.role;
    }
  
    getCreatedAt(): string {
      return this.createdAt.toLocaleDateString();
    }
  
    getUpdatedAt(): string {
      return this.updatedAt.toLocaleDateString();
    }
  
    setId(id: number): void {
      this.id = id;
    }
  
    setUsername(username: string): void {
      this.username = username;
    }
  
    setEmail(email: string): void {
      this.email = email;
    }
  
    setPassword(password: string): void {
      this.password = password;
    }
  
    setRole(role: string): void {
      this.role = role;
    }
  
    setCreatedAt(createdAt: Date): void {
      this.createdAt = createdAt;
    }
  
    setUpdatedAt(updatedAt: Date): void {
      this.updatedAt = updatedAt;
    }
  }
  
  export { User };
  