import {FC} from 'react'
import { Card, Button } from 'react-bootstrap'
import { useRouter } from 'next/navigation';

interface StoreCardProps {
    dataStore: any;
}

const StoreCard:FC<StoreCardProps> = ({dataStore}) => {
    const {businessName,legalName, slogan, shortAddress, 
        completeAddress, phone, email, imageUrl} = dataStore
        const router = useRouter();

        const handleGo = () => {
            console.log('Go to the store')
            ///business-owner/show-profile?email=lupedelgado313@yahoo.com
            router.push(`/business-owner/show-profile?email=${email}`)
        }
  return (
    <Card style={{ width: '18rem', cursor:'pointer' }} onClick={handleGo}>
        <Card.Img variant="top" src={imageUrl} />
        <Card.Body>
            <Card.Title>{businessName}</Card.Title>
            <Card.Text>
                {legalName}
            </Card.Text>
            <Card.Text>
                {slogan}
            </Card.Text>
            <Card.Text>
                {shortAddress}
            </Card.Text>
            <Card.Text>
                {completeAddress}
            </Card.Text>
            <Card.Text>
                {phone}
            </Card.Text>
            <Card.Text>
                {email}
            </Card.Text>
            {/* <Button variant="primary">Go there</Button> */}
        </Card.Body>
    </Card>
  )
}

export default StoreCard