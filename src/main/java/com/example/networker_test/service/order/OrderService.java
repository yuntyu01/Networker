package com.example.networker_test.service.order;

import com.example.networker_test.domain.order.CartItems;
import com.example.networker_test.domain.order.OrderInfo;
import com.example.networker_test.domain.order.PaymentInfo;
import com.example.networker_test.domain.order.ShippingInfo;
import com.example.networker_test.domain.store.Product;
import com.example.networker_test.domain.user.User;
import com.example.networker_test.dto.order.OrderIdDTO;
import com.example.networker_test.dto.order.cartItem.CartItemsDTO;
import com.example.networker_test.dto.order.orderResponse.OrderDetailsResponse;
import com.example.networker_test.dto.order.orderResponse.OrderResponse;
import com.example.networker_test.dto.order.orderinfo.OrderInfoDTO;
import com.example.networker_test.dto.order.paymentinfo.PaymentInfoDTO;
import com.example.networker_test.dto.order.request.OrderData;
import com.example.networker_test.dto.order.shippinginfo.ShippingInfoDTO;
import com.example.networker_test.repository.order.*;
import com.example.networker_test.repository.store.ProductRepository;
import com.example.networker_test.repository.user.UserRepository;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.Reader;
import java.math.BigDecimal;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private static final Logger logger = Logger.getLogger(OrderService.class.getName());

    private final OrderInfoRepository orderInfoRepository;
    private final ShippingInfoRepository shippingInfoRepository;
    private final PaymentInfoRepository paymentInfoRepository;
    private final CartItemsRepository cartItemsRepository;
    private final PayInfoRepository payInfoRepository;
    private final ProductRepository productRepository;

    public OrderService(OrderInfoRepository orderInfoRepository, ShippingInfoRepository shippingInfoRepository, PaymentInfoRepository paymentInfoRepository, CartItemsRepository cartItemsRepository, PayInfoRepository payInfoRepository, ProductRepository productRepository) {
        this.orderInfoRepository = orderInfoRepository;
        this.shippingInfoRepository = shippingInfoRepository;
        this.paymentInfoRepository = paymentInfoRepository;
        this.cartItemsRepository = cartItemsRepository;
        this.payInfoRepository = payInfoRepository;
        this.productRepository = productRepository;
    }


    public ResponseEntity<JSONObject> confirmPayment(@RequestBody String jsonBody) throws Exception {

        JSONParser parser = new JSONParser();
        String orderId;
        String amount;
        String paymentKey;
        try {
            JSONObject requestData = (JSONObject) parser.parse(jsonBody);
            paymentKey = (String) requestData.get("paymentKey");
            orderId = (String) requestData.get("orderId");
            amount = (String) requestData.get("amount");
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

        JSONObject obj = new JSONObject();
        obj.put("orderId", orderId);
        obj.put("amount", amount);
        obj.put("paymentKey", paymentKey);

        String widgetSecretKey = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";
        Base64.Encoder encoder = Base64.getEncoder();
        byte[] encodedBytes = encoder.encode((widgetSecretKey + ":").getBytes(StandardCharsets.UTF_8));
        String authorizations = "Basic " + new String(encodedBytes);

        URL url = new URL("https://api.tosspayments.com/v1/payments/confirm");
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestProperty("Authorization", authorizations);
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestMethod("POST");
        connection.setDoOutput(true);

        OutputStream outputStream = connection.getOutputStream();
        outputStream.write(obj.toString().getBytes("UTF-8"));

        int code = connection.getResponseCode();
        boolean isSuccess = code == 200;

        InputStream responseStream = isSuccess ? connection.getInputStream() : connection.getErrorStream();

        Reader reader = new InputStreamReader(responseStream, StandardCharsets.UTF_8);
        JSONObject jsonObject = (JSONObject) parser.parse(reader);
        responseStream.close();

        return ResponseEntity.status(code).body(jsonObject);
    }

    @Transactional
    public ResponseEntity<?> processOrder(OrderData orderData) {
        OrderInfoDTO orderInfoDTO = orderData.getOrderInfo();

        // UUID 설정
        if (orderInfoDTO.getOrderId() == null || orderInfoDTO.getOrderId().isEmpty()) {
            orderInfoDTO.setOrderId(UUID.randomUUID().toString());
        }
        OrderInfo orderInfo = saveOrderInfo(orderInfoDTO);
        saveShippingInfo(orderInfo, orderData.getShippingInfo());
        savePaymentInfo(orderInfo, orderData.getPaymentInfo());
        saveCartItem(orderInfo, orderData.getCartItems());

        return ResponseEntity.ok().body(Map.of("success", true));
    }

    @Transactional
    public OrderInfo saveOrderInfo(OrderInfoDTO orderInfoDTO) {
        OrderInfo orderInfo = new OrderInfo();
        orderInfo.setOrderId(orderInfoDTO.getOrderId());
        orderInfo.setOrderName(orderInfoDTO.getOrderName());
        orderInfo.setEmail(orderInfoDTO.getEmail());
        orderInfo.setMobile(orderInfoDTO.getMobile());
        orderInfo.setUserid(orderInfoDTO.getUserId());
        return orderInfoRepository.save(orderInfo);
    }

    @Transactional
    public void saveCartItem(OrderInfo orderInfo, List<CartItemsDTO> cartItemDTOs) {
        List<CartItems> cartItemList = new ArrayList<>();
        logger.info("Starting to save cart items");

        for (CartItemsDTO cartItemDTO : cartItemDTOs) {

            logger.info("DTO Values - Product ID: " + cartItemDTO.getProductId() +
                    ", Product Name: " + cartItemDTO.getProductName() +
                    ", Product Price: " + cartItemDTO.getProductPrice() +
                    ", Product Count: " + cartItemDTO.getProductCount());

            CartItems cartItems = new CartItems();
            cartItems.setProductId(cartItemDTO.getProductId());
            cartItems.setProductName(cartItemDTO.getProductName());
            cartItems.setProductPrice(cartItemDTO.getProductPrice());
            cartItems.setProductImage(cartItemDTO.getProductImage());
            cartItems.setProductCount(cartItemDTO.getProductCount());
            cartItems.setOrderInfo(orderInfo);

            logger.info("Saving cart item with Product ID: " + cartItemDTO.getProductId());
            logger.info("Product Name: " + cartItemDTO.getProductName());
            logger.info("Product Price: " + cartItemDTO.getProductPrice());
            logger.info("Product Count: " + cartItemDTO.getProductCount());

            CartItems savedCartItems = cartItemsRepository.save(cartItems);
            cartItemList.add(savedCartItems);
            logger.info("Saved cart item: " + savedCartItems);
        }

        logger.info("Finished saving cart items");
    }

    @Transactional
    public PaymentInfo savePaymentInfo(OrderInfo orderInfo, PaymentInfoDTO paymentInfoDTO) {
        PaymentInfo paymentInfo = new PaymentInfo();
        paymentInfo.setTotalAmount(paymentInfoDTO.getTotalAmount());
        paymentInfo.setShippingFee(paymentInfoDTO.getShippingFee());
        paymentInfo.setFinalAmount(paymentInfoDTO.getFinalAmount());
        paymentInfo.setOrderInfo(orderInfo);
        return paymentInfoRepository.save(paymentInfo);
    }

    @Transactional
    public ShippingInfo saveShippingInfo(OrderInfo orderInfo, ShippingInfoDTO shippingInfoDTO) {
        ShippingInfo shippingInfo = new ShippingInfo();
        shippingInfo.setReceiver(shippingInfoDTO.getReceiver());
        shippingInfo.setPostcode(shippingInfoDTO.getPostcode());
        shippingInfo.setAddress(shippingInfoDTO.getAddress());
        shippingInfo.setAddressDetail(shippingInfoDTO.getAddressDetail());
        shippingInfo.setMobile(shippingInfoDTO.getMobile());
        shippingInfo.setOrderInfo(orderInfo);

        return shippingInfoRepository.save(shippingInfo);
    }

    public ResponseEntity<?> getPaymentInfo(String orderId) {
        Optional<OrderInfo> orderInfoOptional = orderInfoRepository.findById(orderId);
        if (orderInfoOptional.isPresent()) {
            OrderInfo orderInfo = orderInfoOptional.get();
            PaymentInfo paymentInfo = paymentInfoRepository.findByOrderInfo(orderInfo);

            if (paymentInfo != null) {
                Map<String, Object> response = new HashMap<>();
                response.put("userId", orderInfo.getUserid());
                response.put("finalAmount", paymentInfo.getFinalAmount());
                response.put("userEmail", orderInfo.getEmail());
                response.put("orderName", orderInfo.getOrderName());
                response.put("mobile", orderInfo.getMobile());
                response.put("count", cartItemsRepository.countByOrderInfo(orderInfo)); // 상품 갯수 추가

                return ResponseEntity.ok().body(response);
            } else {
                return ResponseEntity.status(404).body("Payment info not found");
            }
        } else {
            return ResponseEntity.status(404).body("Order not found");
        }
    }

    public ResponseEntity<?> getOrderHistory(String userEmail) {
        logger.info("Fetching order history for userEmail: " + userEmail);
        List<OrderInfo> orderInfo = orderInfoRepository.findByUserid(userEmail);
        List<OrderResponse> orderResponses = new ArrayList<>();
        Set<String> processedOrderIds = new HashSet<>();

        if (orderInfo.isEmpty()) {
            logger.info("No orders found for userEmail: " + userEmail);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No order history found for user: " + userEmail);
        }

        // 최신순으로 정렬
        orderInfo.sort(Comparator.comparing(OrderInfo::getCreatedAt).reversed());

        for (OrderInfo orderInfos : orderInfo) {
            String orderId = orderInfos.getOrderId();
            if (processedOrderIds.contains(orderId)) {
                continue;
            }
            processedOrderIds.add(orderId);

            logger.info("OrderInfo found: " + orderInfos);
            List<CartItems> cartItems = cartItemsRepository.findByOrderInfo(orderInfos);
            int itemCount = cartItems.size();  // 해당 orderId의 item 개수

            List<PaymentInfo> paymentInfo = payInfoRepository.findByOrderInfo(orderInfos);
            for (PaymentInfo pay : paymentInfo) {
                logger.info("PaymentInfo found: " + pay);

                if (!cartItems.isEmpty()) {
                    CartItems item = cartItems.get(0);  // cartItems 리스트에서 첫 번째 항목 사용
                    OrderResponse orderResponse = new OrderResponse(
                            item.getProductName(),
                            String.valueOf(itemCount),  // orderId의 item 개수를 사용
                            item.getProductImage(),
                            orderInfos.getOrderId(),
                            String.valueOf(orderInfos.getCreatedAt()),
                            String.valueOf(pay.getFinalAmount())
                    );
                    orderResponses.add(orderResponse);
                }
            }
        }

        if (orderResponses.isEmpty()) {
            logger.info("Order responses are empty for userEmail: " + userEmail);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No order history found for user: " + userEmail);
        }

        return ResponseEntity.ok(orderResponses);
    }

    public ResponseEntity<?> getOrderDetails(String orderId) {
        List<OrderInfo> orderInfo = orderInfoRepository.findByOrderId(orderId);
        List<OrderDetailsResponse> orderDetailsResponses = new ArrayList<>();
        if (orderInfo.isEmpty()) {
            logger.info("No orders found for userEmail: " + orderId);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No order history found for user: " + orderId);
        }

        for (OrderInfo orderInfos : orderInfo) {
            logger.info("OrderInfo found: " + orderInfos);
            List<CartItems> cartItems = cartItemsRepository.findByOrderInfo(orderInfos);
            for (CartItems item : cartItems) {
                logger.info("Item found: " + item);
                List<PaymentInfo> paymentInfo = payInfoRepository.findByOrderInfo(orderInfos);
                for (PaymentInfo pay : paymentInfo) {
                    logger.info("PaymentInfo found: " + pay);
                    List<Product> products = productRepository.findByName(item.getProductName());
                    for (Product product : products) {
                        logger.info("Product found: " + product);
                        OrderDetailsResponse OrderDetailsResponse = new OrderDetailsResponse(
                                String.valueOf(orderInfos.getCreatedAt()),
                                product.getImage(),
                                product.getName(),
                                String.valueOf(product.getPrice()),
                                String.valueOf(item.getProductCount()),
                                String.valueOf(pay.getFinalAmount())
                        );
                        orderDetailsResponses.add(OrderDetailsResponse);
                    }
                }
            }
        }

            if (orderDetailsResponses.isEmpty()) {
                logger.info("Order responses are empty for userEmail: " + orderId);
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No order history found for user: " + orderId);
            }

        return ResponseEntity.ok(orderDetailsResponses);

    }
}
