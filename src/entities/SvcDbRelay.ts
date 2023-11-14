import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SvcEnterprise } from "./SvcEnterprise";

@Index("fk_ent_relay_idx", ["enterpriseId"], {})
@Entity("svc_db_relay", { schema: "data" })
export class SvcDbRelay {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "enterprise_id", nullable: true })
  enterpriseId: number | null;

  @Column("varchar", { name: "target_key", nullable: true, length: 45 })
  targetKey: string | null;

  @Column("varchar", { name: "target_name", nullable: true, length: 45 })
  targetName: string | null;

  @Column("varchar", { name: "target_user", nullable: true, length: 45 })
  targetUser: string | null;

  @Column("varchar", { name: "target_email", nullable: true, length: 100 })
  targetEmail: string | null;

  @Column("varchar", { name: "target_phone", nullable: true, length: 45 })
  targetPhone: string | null;

  @Column("varchar", { name: "target_url", nullable: true, length: 255 })
  targetUrl: string | null;

  @Column("varchar", { name: "target_url_method", nullable: true, length: 5 })
  targetUrlMethod: string | null;

  @Column("varchar", { name: "target_data_type", nullable: true, length: 45 })
  targetDataType: string | null;

  @Column("varchar", { name: "status", nullable: true, length: 45 })
  status: string | null;

  @Column("smallint", { name: "autostart", nullable: true })
  autostart: number | null;

  @ManyToOne(
    () => SvcEnterprise,
    (svcEnterprise) => svcEnterprise.svcDbRelays,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "enterprise_id", referencedColumnName: "id" }])
  enterprise: SvcEnterprise;
}
