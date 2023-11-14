import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SvcEnterprise } from "./SvcEnterprise";
import { SvcMonitor } from "./SvcMonitor";

@Index("enterprise_id", ["enterpriseId"], {})
@Index("mon_id", ["monId"], {})
@Entity("svc_noti", { schema: "data" })
export class SvcNoti {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "enterprise_id", nullable: true })
  enterpriseId: number | null;

  @Column("int", { name: "mon_id", nullable: true })
  monId: number | null;

  @Column("varchar", { name: "noti", nullable: true, length: 2000 })
  noti: string | null;

  @ManyToOne(() => SvcEnterprise, (svcEnterprise) => svcEnterprise.svcNotis, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "enterprise_id", referencedColumnName: "id" }])
  enterprise: SvcEnterprise;

  @ManyToOne(() => SvcMonitor, (svcMonitor) => svcMonitor.svcNotis, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "mon_id", referencedColumnName: "id" }])
  mon: SvcMonitor;
}
