import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SvcEnterprise } from "./SvcEnterprise";

@Index("fk_ent_user_idx", ["enterpriseId"], {})
@Entity("svc_user", { schema: "data" })
export class SvcUser {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", nullable: true, length: 50 })
  name: string | null;

  @Column("varchar", { name: "password", nullable: true, length: 255 })
  password: string | null;

  @Column("varchar", { name: "role", nullable: true, length: 255 })
  role: string | null;

  @Column("int", { name: "enterprise_id", nullable: true })
  enterpriseId: number | null;

  @Column("varchar", { name: "comment", nullable: true, length: 255 })
  comment: string | null;

  @Column("varchar", { name: "address", nullable: true, length: 1000 })
  address: string | null;

  @Column("varchar", { name: "phone", nullable: true, length: 1000 })
  phone: string | null;

  @Column("varchar", { name: "manager", nullable: true, length: 100 })
  manager: string | null;

  @Column("varchar", { name: "part", nullable: true, length: 100 })
  part: string | null;

  @Column("varchar", { name: "ent_number", nullable: true, length: 100 })
  entNumber: string | null;

  @Column("varchar", { name: "rank", nullable: true, length: 100 })
  rank: string | null;

  @Column("varchar", { name: "svc_usercol", nullable: true, length: 45 })
  svcUsercol: string | null;

  @Column("int", { name: "sms", nullable: true })
  sms: number | null;

  @ManyToOne(() => SvcEnterprise, (svcEnterprise) => svcEnterprise.svcUsers, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "enterprise_id", referencedColumnName: "id" }])
  enterprise: SvcEnterprise;
}
