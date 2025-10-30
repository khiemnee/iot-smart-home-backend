import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sensor{
    @PrimaryGeneratedColumn('uuid')
    id : string
    @Column()
    deviceId : string
    @Column()
    temperature : string
    @Column()
    humidity : string
}