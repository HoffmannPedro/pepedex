import React from 'react';
import '../styles/StatsTable.css';

export default function StatsTable({ stats }) {
    if (!stats) return null;

    return (
        <div className='stats-table-wrapper'>
            <table className='stats-table'>
                <tbody>
                    {stats.map(({ stat, base_stat }) => (
                        <tr key={stat.name}>
                            <td>{base_stat}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
}
