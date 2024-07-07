import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { Person } from './persons.model';
import { PersonDetales } from './person-detales.model';
import { CreatePersonDetalesDto } from './dto/create-person-detales.dto';

@ApiTags('Сотрудники')
@Controller('persons')
export class PersonsController {
    constructor(private personsService: PersonsService) {}

    @ApiOperation({ summary: 'Создание сотрудника' })
    @ApiResponse({ status: 200, type: Person })
    @Post()
    create(@Body() personDto: CreatePersonDto) {
        return this.personsService.createPerson(personDto);
    }

    @ApiOperation({ summary: 'Получение всех сотрудников' })
    @ApiResponse({ status: 200, type: [Person] })
    @Get()
    getAll() {
        return this.personsService.getAllPersons();
    }

    @ApiOperation({ summary: 'Получить сотрудника по id' })
    @ApiResponse({ status: 200, type: Person })
    @Get('/:id')
    getById(@Param('id') id: string) {
        return this.personsService.getPersonById(id);
    }

    @ApiOperation({ summary: 'Получить сотрудника по email' })
    @ApiResponse({ status: 200, type: Person })
    @Get('/mail/:email')
    getByEmail(@Param('email') email: string) {
        return this.personsService.getPersonByEmail(email);
    }

    @ApiOperation({ summary: 'Создание детализацию сотрудника' })
    @ApiResponse({ status: 200, type: PersonDetales })
    @Post('/detales/:personId')
    createDetales(
        @Param('personId') personId: string,
        @Body() personDetalesDto: CreatePersonDetalesDto,
    ) {
        return this.personsService.createPersonDetales(
            personDetalesDto,
            personId,
        );
    }
}
