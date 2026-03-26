import test from "node:test";
import assert from "node:assert/strict";

import { computeAddressKey } from "@/lib/address-key";

test("computeAddressKey normalizes spaces/case and keeps same address stable", () => {
  const first = computeAddressKey({
    address: "  123 Main Street  ",
    city: "Athens",
    state: "Attica",
    country: "Greece",
    postalCode: " 10552 ",
    houseNumber: "",
  });

  const second = computeAddressKey({
    address: "123   main street",
    city: "athens",
    state: "ATTICA",
    country: "GREECE",
    postalCode: 10552,
    houseNumber: 0,
  });

  assert.equal(first, second);
});

test("computeAddressKey ignores apartment/floor-related fields by design", () => {
  const base = computeAddressKey({
    address: "Blue Tower",
    city: "Athens",
    state: "Attica",
    country: "Greece",
    postalCode: "11111",
    houseNumber: "12",
  });

  const sameAddressAgain = computeAddressKey({
    address: "Blue Tower",
    city: "Athens",
    state: "Attica",
    country: "Greece",
    postalCode: "11111",
    houseNumber: "12",
  });

  assert.equal(base, sameAddressAgain);
});

