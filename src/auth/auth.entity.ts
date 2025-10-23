import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AuthRole } from 'src/common/enums/user-role.enum';
import { Device } from 'src/device/device.entity';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;

  @OneToMany(()=>Device,(device)=>device.user)
  devices : Device[]

  @Column()
  createdAt: string;
  @Column()
  updatedAt: string;
  @Column({default : AuthRole.USER})
  role : AuthRole
}
