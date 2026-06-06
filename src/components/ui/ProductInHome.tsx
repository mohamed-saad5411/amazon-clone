'use client'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Link from "next/link";
import { NumericFormat } from "react-number-format";
import AddToCartButton from "./addToCartButton";

export default function ProductInHome({ category, image, rating, title, id, price, description }: any) {


  return <>
    <Card className="z-30 group border col-span-1 relative border-gray-200 rounded-md bg-white shadow-md p-4" key={id}>
      <p className=" absolute right-2 top-2 italic text-xs text-gray-600">{category}</p>
      <Link href={`/productDetails/${id}`}>
        <CardHeader color="blue-gray" className="relative h-56">
          <img
            src={image}
            alt="card-image"
            className="h-full p-2 w-full object-contain transition-all duration-500 group-hover:scale-105"
          />
        </CardHeader>

        <CardBody>
          <p
            color="blue-gray"
            className="my-2 font-bold line-clamp-1"
          >
            {title}
          </p>

          <p className="my-2 text-xs line-clamp-2 ">
            {description}
          </p>
          <NumericFormat
            value={price}
            displayType="text"
            thousandSeparator
            prefix="$"
          />
        </CardBody>
      </Link>

      <CardFooter className="mt-4">
        <AddToCartButton product={{ category, thumbnail: image, rating, title, id, price, description }} />
      </CardFooter>
    </Card>
  </>
    ;
}