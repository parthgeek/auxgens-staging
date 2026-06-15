import type { ComplianceStandard } from "../data/complianceStandards";

type ComplianceMarkProps = Pick<ComplianceStandard, "mark" | "detail" | "tone"> & {
  compact?: boolean;
};

export default function ComplianceMark({
  mark,
  detail,
  tone,
  compact = false,
}: ComplianceMarkProps) {
  return (
    <span
      className={`compliance-mark compliance-mark--${tone}${compact ? " compliance-mark--compact" : ""}`}
      aria-hidden="true"
    >
      <span className="compliance-mark__ring">
        <span className="compliance-mark__name">{mark}</span>
        {detail && <span className="compliance-mark__detail">{detail}</span>}
      </span>
    </span>
  );
}
