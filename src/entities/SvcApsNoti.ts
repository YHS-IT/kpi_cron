import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SvcEnterprise } from "./SvcEnterprise";

@Index("enterprise_id", ["enterpriseId"], {})
@Entity("svc_aps_noti", { schema: "data" })
export class SvcApsNoti {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "enterprise_id" })
  enterpriseId: number;

  @Column("date", { name: "date" })
  date: string;

  @Column("varchar", { name: "noti", nullable: true, length: 2000 })
  noti: string | null;

  @ManyToOne(
    () => SvcEnterprise,
    (svcEnterprise) => svcEnterprise.svcApsNotis,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "enterprise_id", referencedColumnName: "id" }])
  enterprise: SvcEnterprise;
}
