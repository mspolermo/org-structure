import { Module } from '@nestjs/common';
import { OrgUnitService } from './org-unit.service';
import { OrgUnitController } from './org-unit.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrgUnit } from './org-unit.model';
import { Person } from 'src/persons/persons.model';

@Module({
    providers: [OrgUnitService],
    controllers: [OrgUnitController],
    imports: [SequelizeModule.forFeature([OrgUnit, Person])],
    exports: [OrgUnitService],
})
export class OrgUnitModule {}
