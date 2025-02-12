import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { Person } from './persons.model';
import { PersonDetales } from './person-detales.model';
import { CreatePersonDetalesDto } from './dto/create-person-detales.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

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

    @ApiOperation({ summary: 'Получить детализацию сотрудника по personId' })
    @ApiResponse({ status: 200, type: PersonDetales })
    @Get('/detales/:personId')
    getDetalesById(@Param('personId') personId: string) {
        return this.personsService.getPersonDetalesById(personId);
    }

    @ApiOperation({ summary: 'Обновление детализации сотрудника' })
    @ApiResponse({ status: 200, type: PersonDetales })
    @Patch('/detales/:personId')
    updateDetales(
        @Param('personId') personId: string,
        @Body() personDetalesDto: CreatePersonDetalesDto,
    ) {
        return this.personsService.updatePersonDetalesById(
            personDetalesDto,
            personId,
        );
    }

    @Patch(':id')
    async updatePerson(
        @Param('id') id: string,
        @Body() updatePersonDto: UpdatePersonDto,
    ) {
        try {
            const updatedPerson = await this.personsService.updatePerson(
                id,
                updatePersonDto,
            );
            if (!updatedPerson) {
                throw new HttpException(
                    'Person not found',
                    HttpStatus.NOT_FOUND,
                );
            }
            return updatedPerson;
        } catch (error) {
            throw new HttpException(
                'Error updating person',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @ApiOperation({ summary: 'Обновить данные сотрудника и его детализацию' })
    @ApiResponse({
        status: 200,
        description: 'Данные сотрудника и его детализация обновлены',
    })
    @Patch('/update-all/:id')
    async updatePersonAndDetales(
        @Param('id') id: string,
        @Body('person') updatePersonDto: UpdatePersonDto,
        @Body('personDetales') updatePersonDetalesDto: CreatePersonDetalesDto,
    ) {
        try {
            const result = await this.personsService.updatePersonAndDetales(
                id,
                updatePersonDto,
                updatePersonDetalesDto,
            );
            return result;
        } catch (error) {
            throw new HttpException(
                'Error updating person and person details',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @ApiOperation({
        summary: 'Удаление сотрудника',
    })
    @Delete(':id')
    async deletePerson(@Param('id') id: string) {
        return await this.personsService.deletePerson(id);
    }

    @ApiOperation({
        summary: 'Поиск сотрудников по имени, телефону или адресу',
    })
    @ApiResponse({ status: 200, type: [Person] })
    @Post('/search')
    async searchPersons(
        @Body() criteria: { name?: string; phone?: string; location?: string },
    ) {
        return this.personsService.searchPersons(criteria);
    }
}
