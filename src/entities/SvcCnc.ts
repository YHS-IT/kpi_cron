import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SvcEdge } from "./SvcEdge";
import { SvcCncProgressMemo } from "./SvcCncProgressMemo";
import { SvcMonitorItems } from "./SvcMonitorItems";

@Index("idx_ent", ["enterpriseId"], {})
@Index("fk_edge_idx", ["edgeId"], {})
@Index("fk__cnc_edge_idx", ["edgeId"], {})
@Index("machineno_enterprise", ["machineNo", "enterpriseId", "id"], {})
@Entity("svc_cnc", { schema: "data" })
export class SvcCnc {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", nullable: true, length: 20 })
  name: string | null;

  @Column("varchar", { name: "machine_no", nullable: true, length: 20 })
  machineNo: string | null;

  @Column("varchar", { name: "ip", nullable: true, length: 50 })
  ip: string | null;

  @Column("int", { name: "port", nullable: true })
  port: number | null;

  @Column("smallint", { name: "autostart", nullable: true })
  autostart: number | null;

  @Column("int", { name: "edge_id", nullable: true })
  edgeId: number | null;

  @Column("varchar", { name: "status", nullable: true, length: 20 })
  status: string | null;

  @Column("timestamp", { name: "modtime", default: () => "CURRENT_TIMESTAMP" })
  modtime: Date;

  @Column("int", { name: "enterprise_id", nullable: true })
  enterpriseId: number | null;

  @Column("varchar", { name: "cnctype", nullable: true, length: 20 })
  cnctype: string | null;

  @Column("varchar", { name: "mode", nullable: true, length: 10 })
  mode: string | null;

  @Column("varchar", { name: "comment", nullable: true, length: 225 })
  comment: string | null;


  @ManyToOne(() => SvcEdge, (svcEdge) => svcEdge.svcCncs, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "edge_id", referencedColumnName: "id" }])
  edge: SvcEdge;

  @OneToMany(
    () => SvcCncProgressMemo,
    (svcCncProgressMemo) => svcCncProgressMemo.m
  )
  svcCncProgressMemos: SvcCncProgressMemo[];

  @OneToMany(() => SvcMonitorItems, (svcMonitorItems) => svcMonitorItems.cnc)
  svcMonitorItems: SvcMonitorItems[];
}
