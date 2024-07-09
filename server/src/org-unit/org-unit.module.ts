import { Module } from '@nestjs/common';
import { OrgUnitService } from './org-unit.service';
import { OrgUnitController } from './org-unit.controller';

@Module({
    providers: [OrgUnitService],
    controllers: [OrgUnitController],
})
export class OrgUnitModule {}
