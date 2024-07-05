import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        example: 'user@gmail.com',
        description: 'Электронная почта',
    })
    readonly email: string;

    @ApiProperty({
        example: '12345678',
        description: 'Пароль',
    })
    readonly password: string;
}
