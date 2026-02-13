import { STATUSES } from "../../constants";

const Stats = ({ jobList }) => {

  const stats = jobList.reduce((accumulator, job) => {
    accumulator.total++;

    if (accumulator[job.status] !== undefined) {
      accumulator[job.status]++;
    }

    return accumulator;
  },
  STATUSES.reduce((accumulator, status) => {
    accumulator[status] = 0;
    return accumulator;
  }, { total: 0 })
  );

  return (
    <div className="stats">
      <p>Total: {stats.total}</p>

      {STATUSES.map((status) => (
        <p key={status}>
          {status}: {stats[status]}
        </p>
      ))}
    </div>
  );
};

export default Stats;
// export default function Stats({ jobList }) {