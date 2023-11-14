import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("baro_machine_stdwork", { schema: "data" })
export class BaroMachineStdwork {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "ent_id", nullable: true })
  entId: number | null;

  @Column("date", { name: "date", nullable: true })
  date: string | null;

  @Column("varchar", { name: "mid", nullable: true, length: 45 })
  mid: string | null;

  @Column("int", { name: "mkey", nullable: true })
  mkey: number | null;

  @Column("varchar", { name: "start_time", nullable: true, length: 10 })
  startTime: string | null;

  @Column("varchar", { name: "end_time", nullable: true, length: 10 })
  endTime: string | null;

  @Column("int", { name: "work_time", nullable: true })
  workTime: number | null;

  @Column("int", { name: "total_time", nullable: true })
  totalTime: number | null;

  @Column("int", { name: "brk_time", nullable: true })
  brkTime: number | null;

  @Column("int", { name: "eat_time", nullable: true })
  eatTime: number | null;
}
