import { Auth } from "src/auth/auth.entity";
import { DeviceStatus, DeviceKind } from "src/common/enums/device.enum";
import { Column, Entity, ManyToOne,  PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Device{
    @PrimaryGeneratedColumn('uuid')
    id:string
    @Column()
    name:string
    @Column()
    type : DeviceKind
    @Column({default : DeviceStatus.OFFLINE})
    status : DeviceStatus
    @Column()
    firmwareVersion:string
    @ManyToOne(()=>Auth,(auth)=>auth.devices)
    user : Auth
    @Column()
    createdAt:string
    @Column()
    updatedAt:string
}