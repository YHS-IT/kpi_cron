import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("baro_machine_report", { schema: "data" })
export class BaroMachineReport {
  @PrimaryGeneratedColumn({ type: "int", name: "seq" })
  seq: number;

  @Column("int", { name: "ent_id", nullable: true })
  entId: number | null;

  @Column("int", { name: "mkey", nullable: true })
  mkey: number | null;

  @Column("date", { name: "date", nullable: true })
  date: string | null;

  @Column("varchar", { name: "mid", nullable: true, length: 45 })
  mid: string | null;

  @Column("int", { name: "lot", nullable: true })
  lot: number | null;

  @Column("varchar", { name: "program", nullable: true, length: 100 })
  program: string | null;

  @Column("int", { name: "count", nullable: true })
  count: number | null;

  @Column("int", { name: "plan", nullable: true })
  plan: number | null;

  @Column("timestamp", { name: "start_time", nullable: true })
  startTime: Date | null;

  @Column("timestamp", { name: "end_time", nullable: true })
  endTime: Date | null;

  @Column("timestamp", { name: "setting_start", nullable: true })
  settingStart: Date | null;

  @Column("timestamp", { name: "setting_end", nullable: true })
  settingEnd: Date | null;

  @Column("int", { name: "avg_idle", nullable: true })
  avgIdle: number | null;

  @Column("int", { name: "avg_active", nullable: true })
  avgActive: number | null;

  @Column("int", { name: "avg_period", nullable: true })
  avgPeriod: number | null;

  @Column("int", { name: "std_active", nullable: true })
  stdActive: number | null;
}
