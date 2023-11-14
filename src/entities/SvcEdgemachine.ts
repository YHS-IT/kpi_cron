import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SvcEdge } from "./SvcEdge";

@Index("uk_mid_edge_id", ["mid", "edgeId"], { unique: true })
@Index("fk_edge_idx", ["edgeId"], {})
@Entity("svc_edgemachine", { schema: "data" })
export class SvcEdgemachine {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "mid", comment: "엣지장비 고유값", length: 50 })
  mid: string;

  @Column("varchar", {
    name: "status",
    nullable: true,
    comment: "접속승인 상태 (CONFIRM 인것만 유효처리)",
    length: 10,
  })
  status: string | null;

  @Column("int", { name: "edge_id", nullable: true, comment: "논리엣지id " })
  edgeId: number | null;

  @Column("varchar", { name: "comment", nullable: true, length: 255 })
  comment: string | null;

  @ManyToOne(() => SvcEdge, (svcEdge) => svcEdge.svcEdgemachines, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "edge_id", referencedColumnName: "id" }])
  edge: SvcEdge;
}
