import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SvcEnterprise } from "./SvcEnterprise";
import { SvcMonitorItems } from "./SvcMonitorItems";
import { SvcNoti } from "./SvcNoti";

@Index("fk_monitor_ent_idx", ["enterpriseId"], {})
@Entity("svc_monitor", { schema: "data" })
export class SvcMonitor {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "enterprise_id" })
  enterpriseId: number;

  @Column("varchar", { name: "name", nullable: true, length: 45 })
  name: string | null;

  @Column("timestamp", { name: "regdate", nullable: true })
  regdate: Date | null;

  @Column("varchar", { name: "loginid", nullable: true, length: 255 })
  loginid: string | null;

  @Column("varchar", { name: "status", nullable: true, length: 10 })
  status: string | null;

  @Column("varchar", { name: "cncdata", nullable: true, length: 2000 })
  cncdata: string | null;

  @ManyToOne(
    () => SvcEnterprise,
    (svcEnterprise) => svcEnterprise.svcMonitors,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "enterprise_id", referencedColumnName: "id" }])
  enterprise: SvcEnterprise;

  @OneToMany(
    () => SvcMonitorItems,
    (svcMonitorItems) => svcMonitorItems.monitor
  )
  svcMonitorItems: SvcMonitorItems[];

  @OneToMany(() => SvcNoti, (svcNoti) => svcNoti.mon)
  svcNotis: SvcNoti[];
}
