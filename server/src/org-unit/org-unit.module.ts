import { Module } from '@nestjs/common';
import { OrgUnitService } from './org-unit.service';
import { OrgUnitController } from './org-unit.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrgUnit } from './org-unit.model';

@Module({
    providers: [OrgUnitService],
    controllers: [OrgUnitController],
    imports: [SequelizeModule.forFeature([OrgUnit])],
    exports: [OrgUnitService],
})
export class OrgUnitModule {}
