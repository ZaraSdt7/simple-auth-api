import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/router/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // روت لاگین که JWT را برمی‌گرداند
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return this.authService.login(user);
  }

  // روت تأیید توکن JWT
  @Post('verify')
  @UseGuards(JwtAuthGuard)
  verify(@Req() req) {
    return {
      status: 'token is valid',
      user: req.user, // اگر توکن معتبر باشه، اطلاعات کاربر برگردانده میشه
    };
  }
}
