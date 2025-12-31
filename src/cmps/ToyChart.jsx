import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { loadToys } from '../store/actions/toy.actions.js';



ChartJS.register(ArcElement, Tooltip, Legend);

export function ToyChart() {

    const toys = useSelector((storeState) => storeState.toyModule.toys)
    console.log('toys in ToyChart:', toys);

    useEffect(() => {
        loadToys()
            .catch((err) => {
                console.log('Cannot load toys for chart');
            })
    }, [])

    const toyLabels = toys.map(toy => toy.labels)
    const toyPrices = toys.map(toy => toy.price)

    const data = {
        labels: toyLabels,
        datasets: [
            {
                label: 'Toy Prices',
                data: toyPrices,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'right',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return ' $' + context.parsed;
                    }
                }
            }
        }
    }

    return (
        <section className="toy-chart main-layout">
            <h1>Toy Chart</h1>
            <Doughnut data={data} options={options} />
        </section>
    )

}


// export function App() {
//     return <Doughnut data={data} />;
// }
