import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SvcCnc } from "./SvcCnc";
import { SvcMonitor } from "./SvcMonitor";

@Index("fk_monitor_id_idx", ["monitorId"], {})
@Index("fk_cnc_id_idx", ["cncId"], {})
@Entity("svc_monitor_items", { schema: "data" })
export class SvcMonitorItems {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "monitor_id" })
  monitorId: number;

  @Column("int", { name: "cnc_id" })
  cncId: number;

  @Column("int", { name: "ord", nullable: true, default: () => "'0'" })
  ord: number | null;

  @ManyToOne(() => SvcCnc, (svcCnc) => svcCnc.svcMonitorItems, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "cnc_id", referencedColumnName: "id" }])
  cnc: SvcCnc;

  @ManyToOne(() => SvcMonitor, (svcMonitor) => svcMonitor.svcMonitorItems, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "monitor_id", referencedColumnName: "id" }])
  monitor: SvcMonitor;
}
