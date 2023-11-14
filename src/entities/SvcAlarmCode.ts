import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("mtype_code", ["mtype", "code"], {})
@Entity("svc_alarm_code", { schema: "data" })
export class SvcAlarmCode {
  @PrimaryGeneratedColumn({ type: "int", name: "seq" })
  seq: number;

  @Column("varchar", { name: "mtype", length: 45 })
  mtype: string;

  @Column("varchar", { name: "code", length: 45 })
  code: string;

  @Column("varchar", { name: "msg", nullable: true, length: 256 })
  msg: string | null;

  @Column("text", { name: "description", nullable: true })
  description: string | null;
}
