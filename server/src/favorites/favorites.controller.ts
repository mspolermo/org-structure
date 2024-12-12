import {
    Controller,
    Post,
    Get,
    Delete,
    Param,
    Request,
    UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
    constructor(private favoritesService: FavoritesService) {}

    @Post(':personId')
    async addFavorite(@Request() req, @Param('personId') personId: string) {
        const userId = req.user['id'];
        return this.favoritesService.addFavorite(userId, personId);
    }

    @Get()
    async getFavorites(@Request() req) {
        const userId = req.user['id'];
        return this.favoritesService.getFavorites(userId);
    }

    @Delete(':personId')
    async removeFavorite(@Request() req, @Param('personId') personId: string) {
        const userId = req.user['id'];
        return this.favoritesService.removeFavorite(userId, personId);
    }
}
